﻿using AnimaPlayBack.Data;
using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AnimaPlayBack.Models.Enumerators;
using AnimaPlayBack.Models.Requests;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using System.Web;

namespace AnimaPlayBack.Services
{
    public class EnrollService
    {
        private UserManager<CustomIdentityUser> _userManager;
        private IMapper _mapper;
        private UserContext _context;
        private EmailService _emailService;

        public EnrollService(UserManager<CustomIdentityUser> userManager, IMapper mapper, UserContext context, EmailService emailService)
        {
            this._userManager = userManager;
            this._mapper = mapper;
            this._context = context;
            this._emailService = emailService;
        }

        public Result Enroll(LoginDTO dto)
        {
            if (IsEmailOnTheDataBase(dto.Email))
            {
                return Result.Fail($"There is already an account with the email: {dto.Email}");
            }

            switch (dto.UserType) {
                case UserTypeEnum.STUDENT:
                    return EnrollStudent(dto);
                case UserTypeEnum.ADMIN:
                    return EnrollAdmin(dto);
                //case UserTypeEnum.PARTNER:
                //    return EnrollPartner(dto);
                //case UserTypeEnum.ADVISOR:
                //    return EnrollAdvisor(dto);
                //case UserTypeEnum.LABLIDER:
                //    return EnrollLabLider(dto);
                    default: return Result.Fail("User type is not valid");
            }
        }

        private Result EnrollAdmin(LoginDTO dto)
        {

            var userRole = UserTypeExtensions.getUserString(dto.UserType);

            if (!(userRole == "admin"))
            {
                return Result.Fail($"the user role: {userRole} is not allowed");
            }

            var user = this._mapper.Map<User>(dto);
            var identityUser = this._mapper.Map<CustomIdentityUser>(user);
            var identityResult = this._userManager.CreateAsync(identityUser, dto.Password);

            if (identityResult.Result.Succeeded)
            {
                var activationCode = this._userManager
                    .GenerateEmailConfirmationTokenAsync(identityUser);

                this._userManager.AddToRoleAsync(identityUser, userRole);
                var code = activationCode.Result;
                var encondedCode = HttpUtility.UrlEncode(code);

                this._emailService.SendEmail(
                    new[] { identityUser.Email },
                    "HUB ANIMA LAB - Link de Ativação",
                    identityUser.Id,
                    encondedCode
                    );

                return Result.Ok().WithSuccess(code);
            }
            return Result.Fail(GetFailResult(identityResult.Result.Errors));
        }

        private Result EnrollStudent(LoginDTO dto)
        {
            var studentDTO = (StudentDTO) dto;

            var userRole = UserTypeExtensions.getUserString(studentDTO.UserType);

            if (!(userRole == "student"))
            {
                return Result.Fail($"the user role: {userRole} is not allowed on this api");
            }

            var user = this._mapper.Map<User>(studentDTO);
            var identityUser = this._mapper.Map<CustomIdentityUser>(user);
            var identityResult = this._userManager.CreateAsync(identityUser, studentDTO.Password);

            if (identityResult.Result.Succeeded)
            {
                var student = this._mapper.Map<Student>(dto);
                student.CustomIdentityUser = identityUser;

                this._context.Students.Add(student);

                this._context.SaveChanges();

                var activationCode = this._userManager
                    .GenerateEmailConfirmationTokenAsync(identityUser);

                this._userManager.AddToRoleAsync(identityUser, userRole);
                var code = activationCode.Result;
                var encondedCode = HttpUtility.UrlEncode(code);

                this._emailService.SendEmail(
                    new[] { identityUser.Email },
                    "HUB ANIMA LAB - Link de Ativação",
                    identityUser.Id,
                    encondedCode
                    );

                return Result.Ok().WithSuccess(code);
            }

            return Result.Fail(GetFailResult(identityResult.Result.Errors));
        }

        public Result ActivateUser(ActivateAccountRequest request)
        {
            var identityUser = this._userManager
                .Users
                .FirstOrDefault(u => u.Id == request.UserId);

            if (identityUser == null)
            {
                return Result.Fail($"No user found with the id: {request.UserId}");
            }

            var identityResult = this._userManager
                .ConfirmEmailAsync(identityUser, request.ActivationCode);

            if (identityResult.Result.Succeeded)
            {
                return Result.Ok().WithSuccess("The account was activated with sucess");
            }

            return Result.Fail("Fail activating user account");
        }

        private string GetFailResult(IEnumerable<IdentityError> erros)
        {
            var errorMessage = "";
            foreach (var error in erros)
            {
                errorMessage += $"{error.Code} {error.Description} ";
            }
            return errorMessage;
        }

        private bool IsEmailOnTheDataBase(string email)
        {
            var user = this._context.Users.FirstOrDefault(x => x.NormalizedEmail == email.ToUpper());

            if (user == null || !(user.EmailConfirmed)) return false;
            return true;
        }
    }
}
