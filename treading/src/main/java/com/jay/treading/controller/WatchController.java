package com.jay.treading.controller;


import com.jay.treading.modal.Coin;
import com.jay.treading.modal.User;
import com.jay.treading.modal.Watchlist;
import com.jay.treading.service.CoinService;
import com.jay.treading.service.UserService;
import com.jay.treading.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchController {
    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<Watchlist> getUserWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());
        return ResponseEntity.ok(watchlist);
    }

//    @PostMapping("/create")
//    public ResponseEntity<Watchlist> createWatchlist(@RequestHeader("Authorization") String jwt) throws Exception {
//        User user = userService.findUserProfileByJwt(jwt);
//        Watchlist watchlist = watchlistService.createWatchlist(user);
//        return
//    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<Watchlist> getWatchlistById(@PathVariable Long watchlistId) throws Exception {
        Watchlist watchlist = watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(@RequestHeader("Authorization") String jwt,
                                                   @PathVariable String coinId) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);
        Coin addCoin = watchlistService.addItemToWatchlist(coin, user);
        return ResponseEntity.ok(addCoin);
    }
}
