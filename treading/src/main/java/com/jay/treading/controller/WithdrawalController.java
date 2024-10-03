package com.jay.treading.controller;

import com.jay.treading.modal.User;
import com.jay.treading.modal.Wallet;
import com.jay.treading.modal.Withdrawal;
import com.jay.treading.service.UserService;
import com.jay.treading.service.WalletService;
import com.jay.treading.service.WithdrawalService;
import lombok.With;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WithdrawalController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private UserService userService;

//    private WalletTransactionService walletTransactionService;

    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(@PathVariable Long amount,
                                               @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Wallet userWallet = walletService.getUserWallet(user);

        Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
        walletService.addBalance(userWallet, -withdrawal.getAmount());

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @PostMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawal(@PathVariable Long id,
                                               @PathVariable boolean accept,
                                               @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        Withdrawal withdrawal = withdrawalService.procedWithWithdrawal(id, accept);

        Wallet userWallet = walletService.getUserWallet(user);

        if(!accept) {
            walletService.addBalance(userWallet, withdrawal.getAmount());
        }

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        List<Withdrawal> withdrawals = withdrawalService.getUserWithdrawalHistory(user);

        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }

    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        List<Withdrawal> withdrawals = withdrawalService.getAllWithdrawalRequest();

        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }
}
