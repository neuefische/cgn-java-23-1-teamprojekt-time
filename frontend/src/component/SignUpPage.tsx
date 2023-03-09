import Layout from "./Layout";
import SignForm from "./SignForm";

export default function SignUpPage() {

    return (
        <Layout>
            <div style={{padding: "5rem 0"}}>
                <h1>Sign Up</h1>
                <SignForm action={"sign-up"}/>
            </div>
        </Layout>
    );
}