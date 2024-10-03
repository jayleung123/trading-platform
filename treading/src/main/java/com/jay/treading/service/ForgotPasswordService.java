package com.jay.treading.service;

import com.jay.treading.domain.VerificationType;
import com.jay.treading.modal.ForgotPasswordToken;
import com.jay.treading.modal.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);

    }

