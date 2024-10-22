export const AccountKey = {
    type: "service_account",
    project_id: "themovie-af1e4",
    private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID_FIRE_BASE,
    private_key:    process.env.NEXT_PUBLIC_PRIVATE_KEY_FIRE_BASE?.replace(/\\n/gm, "\n"),
    client_email: "firebase-adminsdk-jiwgb@themovie-af1e4.iam.gserviceaccount.com",
    client_id: "108038711341795746075",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jiwgb%40themovie-af1e4.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};
