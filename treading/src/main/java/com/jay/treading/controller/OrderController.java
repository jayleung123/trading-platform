package com.jay.treading.controller;

import com.jay.treading.domain.OrderStatus;
import com.jay.treading.domain.OrderType;
import com.jay.treading.modal.Coin;
import com.jay.treading.modal.Order;
import com.jay.treading.modal.User;
import com.jay.treading.request.CreateOrderRequest;
import com.jay.treading.service.CoinService;
import com.jay.treading.service.OrderService;
import com.jay.treading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

@Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt,
                                                 @RequestBody CreateOrderRequest req) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{coderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader() String jwtToken,
                                              @PathVariable Long orderId) throws Exception {

//        if(jwtToken == null) {
//            throw new Exception("Token missing");
//        }

        User user = userService.findUserProfileByJwt(jwtToken);

        Order order = orderService.getOrderById(orderId);
        if(order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.ok(order);
        }
        else {
            throw new Exception("you don't have access");
        }
    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrderForUser(@RequestHeader("Authorization") String jwt,
                                                          @RequestParam(required = false) OrderType orderType,
                                                          @RequestParam(required = false) String assetSymbol) throws Exception {

        Long userId = userService.findUserProfileByJwt(jwt).getId();

        List<Order> userOrder = orderService.getAllOrdersOfUser(userId, orderType, assetSymbol);
        return ResponseEntity.ok(userOrder);
    }
}
