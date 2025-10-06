import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { verifyEmail, logoutUser, currentUser } from "../../features/auth/auth.actions";

interface IVerifyEmailProps {}

const VerifyEmailPage: React.FC<IVerifyEmailProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, loading, error, user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  const handleVerifyEmail = async () => {
    if (!accessToken) return;
    await dispatch(verifyEmail(accessToken));
  };

  // 🔹 Auto-run verification on mount
  useEffect(() => {
    const runVerification = async () => {
      if (!accessToken) {
        await handleLogout();
        return;
      }
      await dispatch(currentUser()); // refresh user data before verifying
      await dispatch(verifyEmail(accessToken));
    };

    runVerification();
  }, [accessToken, dispatch]);

  // 🔹 Redirect when verified
  useEffect(() => {
    if (user?.isVerified) {
      const timeout = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [user, navigate]);

  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
          {loading && <p className="text-gray-500">Verifying your email...</p>}

          {!loading && user?.isVerified && (
            <p className="text-green-600">
              ✅ Your email has been verified! Redirecting to login...
            </p>
          )}

          {!loading && error && (
            <>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleVerifyEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
