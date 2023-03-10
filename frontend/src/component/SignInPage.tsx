import Layout from "./Layout";
import SignForm from "./SignForm";

export default function SignInPage() {

    return (
        <Layout>
            <div style={{padding: "5rem 0"}}>
                <h1>Sign In</h1>
                <SignForm action={"sign-in"}/>
            </div>
        </Layout>
    );
}