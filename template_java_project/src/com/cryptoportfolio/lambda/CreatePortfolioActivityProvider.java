package com.cryptoportfolio.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
//import com.cryptoportfolio.dependency.DaggerServiceComponent;
import com.cryptoportfolio.activity.CreatePortfolioActivity;
import com.cryptoportfolio.dependency.ServiceComponent;
import com.cryptoportfolio.models.requests.CreatePortfolioRequest;
import com.cryptoportfolio.models.responses.CreatePortfolioResponse;

public class CreatePortfolioActivityProvider implements RequestHandler<CreatePortfolioRequest, CreatePortfolioResponse> {

    public CreatePortfolioActivityProvider() {

    }

    @Override
    public CreatePortfolioResponse handleRequest(final CreatePortfolioRequest createPortfolioRequest, Context context) {
        ServiceComponent dagger = null;
        return dagger
                .provideCreatePortfolioActivity()
                .handleRequest(createPortfolioRequest, context);
    }

}
