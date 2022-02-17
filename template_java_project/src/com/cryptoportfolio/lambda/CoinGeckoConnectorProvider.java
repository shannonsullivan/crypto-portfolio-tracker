package com.cryptoportfolio.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.ScheduledEvent;
import com.cryptoportfolio.Dependency.DaggerServiceComponent;

public class CoinGeckoConnectorProvider  implements RequestHandler<ScheduledEvent, String> {

    public CoinGeckoConnectorProvider() {

    }

    @Override
    public String handleRequest(final ScheduledEvent event, Context context) {
        return DaggerServiceComponent.create().provideCoinGeckoConnector().handleRequest(event, context);
    }
}
