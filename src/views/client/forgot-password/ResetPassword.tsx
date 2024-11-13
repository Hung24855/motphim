import Button from "@/base/libs/button";
import Input from "@/base/libs/input";
import { getDataLocalStorage } from "@/base/utils/function";
import { AccountsService } from "@/domain/tai-khoan/services";
import { resetPasswordSchema, ResetPasswordType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TOKEN_VERIFY_CODE } from ".";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";

export default function ResetPassword() {
    const { ChangePasswordMutation, isPendingChangePassword } = AccountsService.useAccounts();
    const router = useRouter();
    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm<ResetPasswordType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(resetPasswordSchema)
    });

    const submit = async (data: ResetPasswordType) => {
        const token = getDataLocalStorage(TOKEN_VERIFY_CODE) ?? "";
        if (token) {
            ChangePasswordMutation(
                { newPassword: data.password, token },
                {
                    onSuccess: () => {
                        toast.success("Đổi mật khẩu thành công!");
                        router.push("/dang-nhap");
                    },
                    onError: (error) => {
                        toast.error(error.message);
                    }
                }
            );
        }
    };
    return (
        <form className="space-y-3" method="POST" onSubmit={handleSubmit(submit)}>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        field={field}
                        label="Mật khẩu mới"
                        placeholder="Mật khẩu mới"
                        required
                        error={errors.password}
                        type="password"
                    />
                )}
            />

            <Controller
                name="confirm_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        field={field}
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        required
                        error={errors.confirm_password}
                        type="password"
                    />
                )}
            />

            <Button type="submit" block loading={isPendingChangePassword}>
                Xác nhận
            </Button>
        </form>
    );
}
