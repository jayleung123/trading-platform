package com.jay.treading.service;

import com.jay.treading.modal.Coin;
import com.jay.treading.modal.User;
import com.jay.treading.modal.Watchlist;

public interface WatchlistService {

    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(User user);

    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user);
}
