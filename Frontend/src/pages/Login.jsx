    import React from "react";

    const Login = () => {
    return (
        <div style={styles.page}>
        <div style={styles.card}>
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Login to continue</p>

            <label style={styles.label}>Email</label>
            <input type="email" placeholder="Enter your email" style={styles.input} />

            <label style={styles.label}>Password</label>
            <input type="password" placeholder="Enter your password" style={styles.input} />

            <button style={styles.button}>LOGIN</button>

            <p style={styles.bottom}>
            Don't have an account?{" "}
            <span style={styles.link}>Register here</span>
            </p>
        </div>
        </div>
    );
    };

    const styles = {
    page: {
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #1a1a1a, #ff8c00)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
    },

    card: {
        width: "420px",
        padding: "40px",
        background: "rgba(0, 0, 0, 0.65)",
        borderRadius: "12px",
        boxShadow: "0px 0px 15px rgba(255, 109, 31, 0.3)",
        borderLeft: "2px solid #ff8c00",
        borderRight: "2px solid #ff8c00",
    },

    title: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "30px",
        fontWeight: "700",
        marginBottom: "5px",
    },

    subtitle: {
        textAlign: "center",
        color: "#cfcfcf",
        fontSize: "14px",
        marginBottom: "30px",
    },

    label: {
        color: "#ff8c00",
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "6px",
        display: "block",
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ff8c00",
        background: "rgba(255, 255, 255, 0.05)",
        color: "#fff",
        outline: "none",
        fontSize: "15px",
    },

    button: {
        width: "100%",
        padding: "12px",
        background: "#ff8c00",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        color: "#000",
        marginTop: "5px",
    },

    bottom: {
        textAlign: "center",
        color: "#d3d3d3",
        marginTop: "18px",
        fontSize: "14px",
    },

    link: {
        color: "#ff8c00",
        cursor: "pointer",
        fontWeight: "600",
    },
    };

    export default Login;
