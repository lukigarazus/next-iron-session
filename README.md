1. Run `yarn`
2. Fill in .env.local
3. Run `yarn dev`

A few points about the implementation:

1. Time between a token expiring and the related cookie expiring was not specified, set it to 50% of the token expiration time. So if a token is valid for an hour the cookie will be valid for 1.5 hours to give the user some time to stumble upon a refresh
2. Should everything taken from the API be rendered on the server? I provided both server-side checks and client-side checks. Server side checks make protected content stay on the page in other tabs on log out, client side checks can leverage SWR cache to hide protected content in every tab.
3. I tried calling /o/revoke_token/ as per the docs https://django-oauth-toolkit.readthedocs.io/en/latest/tutorial/tutorial_04.html but it was not successful. That's why I created dummy endpoint for both revoking (making it invalid) and expiring (but it expires the cookie) the token.
4. I implemented the app using oauth2-mock-server first. That's why there's an oauthCallback endpoint and an if statement in the login endpoint. I thought that it would be nice to leave them there and control the behaviour with the .env file
