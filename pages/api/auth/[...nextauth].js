
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: "227459679786-kkpis1s21cmd869qusa7bd3q9vifac6u.apps.googleusercontent.com",
      clientSecret: "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",
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  jwt: {
    encryption: true,
  },
    secret:"1ewnfelnf4;g47",
  callbacks: {
    async jwt(token, account) {
          // console.log(account)

      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      console.log(token)
      return token;
     
    },
    redirect: async (url, _baseUrl) => {
      if (url === '/') {
        return Promise.resolve('/');
      }
      return Promise.resolve('/');
    },
  },
})