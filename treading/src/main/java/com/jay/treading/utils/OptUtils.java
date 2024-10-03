package com.jay.treading.utils;

import java.util.Random;

public class OptUtils {
    public static String generateOTP() {
        int otpLength = 6;
        Random random = new Random();

        StringBuilder otp = new StringBuilder();

        for(int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(18));
        }
        return otp.toString();
    }
}
