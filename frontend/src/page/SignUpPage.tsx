import Layout from "../component/Layout";
import SignForm from "../component/SignForm";

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