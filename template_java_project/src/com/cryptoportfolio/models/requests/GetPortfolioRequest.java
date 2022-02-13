package com.cryptoportfolio.models.requests;

import java.util.Objects;

public class GetPortfolioRequest {
    private String username;
    private String token;

    public GetPortfolioRequest(Builder builder) {
        this.username = builder.username;
        this.token = builder.token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public static Builder builder() { return new Builder(); }

    public static final class Builder {
        private String username;
        private String token;


        private Builder() {

        }

        public Builder withUsername(String usernameToUse) {
            this.username = usernameToUse;
            return this;
        }

        public Builder withToken(String tokenToUse) {
            this.token = tokenToUse;
            return this;
        }

        public GetPortfolioRequest build() { return new GetPortfolioRequest(this); }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GetPortfolioRequest)) return false;
        GetPortfolioRequest that = (GetPortfolioRequest) o;
        return Objects.equals(getUsername(), that.getUsername()) && Objects.equals(getToken(), that.getToken());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUsername(), getToken());
    }

    @Override
    public String toString() {
        return "GetPortfolioRequest{" +
                "username='" + username + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}