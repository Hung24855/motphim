import { NextRequest, NextResponse } from "next/server";
import { getMessaging, MulticastMessage } from "firebase-admin/messaging";
import { Exception } from "../utils/Exception";
import { adminApp } from "../firebase.admin";

export async function POST(request: NextRequest) {
    try {
        //Lấy danh sách các token yêu thích phim A từ DB

        const registrationTokens = [
            "cHytOphKxMjISV0UZPV-eQ:APA91bFkJrOkujhh63YUumdsTDm_721uErSSZLX5tU1oGRAGug-Pabe2mINnZ4mdVl9N13jFXqSFPTYa8bONeEA1OoTlEgp4guzXHIxPGjCIGlm3tkfSTzzRE1uKIHbY3VVq8k0LsvzT",
            "cBeIAwDxyVMXsRCAGOh4Sa:APA91bE_COzWgyYp3OW-dGivHLn9dlR_acVyTUtOViJmPfBzJIy2V9nAtiKsCL4KvMq0P1u7jztc-ldQPRXS35iqCvLcDEoJX0et92UaE25ueRbK_pnUjl5Fa1elWnv8HtLvq-s5cNbc"
        ];

        const message: MulticastMessage = {
            tokens: registrationTokens,
            notification: {
                title: "❤️ Motphim ❤️",
                body: "Có thông báo mới! ^-^",
                // imageUrl: ""
            }
        };
        getMessaging(adminApp).sendEachForMulticast(message);

        return NextResponse.json({ message: "Gửi thông báo thành công!" });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
}
