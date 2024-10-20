import { ConfigProvider } from "antd";

export default function AntDesignConfig({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: "#f3f4f6"
                    }
                },
                token: {
                    colorPrimary: "#7c69ef"
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
}
