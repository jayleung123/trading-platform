package com.jay.treading.service;

import com.jay.treading.modal.PaymentDetails;
import com.jay.treading.modal.User;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user);
    public PaymentDetails getUserPaymentDetails(User user);
}
