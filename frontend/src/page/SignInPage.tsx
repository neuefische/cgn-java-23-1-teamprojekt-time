import Layout from "../component/Layout";
import SignForm from "../component/SignForm";

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