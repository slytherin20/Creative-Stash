import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import addAnonymousCartItems from "../../data/addAnonymousCartItems";
import { createCart } from "../../data/createCart";
import { createWishlist } from "../../data/createWishlist";
import { createOrderslist } from "../../data/createOrdersList";

function SignUpForm({ changeForm, changeModalContent }:{
  changeForm:(val:string)=>void,
  changeModalContent:(val:string)=>void
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  function userAuth(e:FormEvent) {
    e.preventDefault();
    if (password === confirmPassword) {
      if (password.length >= 6) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            changeModalContent("loading");
            if(auth.currentUser){
              auth.currentUser.getIdToken().then(async (token) => {
                let cartStatus = await createCart(token);
                if (cartStatus == 200) {
                  addAnonymousCartItems();
                  createWishlist(token);
                  createOrderslist(token);
                }
              });
              navigate("/add-billing-address");
              sendEmailVerification(auth.currentUser).then(() => {
                changeModalContent("email sent");
              });
            }
          })
          .catch(() => setErrorMessage("SignUp issue. please try again."))
          .catch(() =>
            setErrorMessage("Signup issue. Please try again later.")
          );
      } else {
        setErrorMessage("Password should be atleast 6 digit long.");
      }
    } else {
      setErrorMessage("Password not matching. Please enter again.");
    }
  }

  return (
    <div className="h-75 flex flex-column justify-center items-center">
      <form
        className="ma2 flex flex-column items-center justify-between h-90"
        onSubmit={userAuth}
      >
        <div className="flex flex-column ma2">
          <label htmlFor="email-id">E-mail:</label>
          <input
            type="email"
            placeholder="Enter E-mail Id"
            required
            id="email-id"
            className="bn h2 w5 login-details"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-column ma2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            required
            id="password"
            className="h2 w5 bn login-details"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-column ma2">
          <label htmlFor="confirm-password"> Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            id="confirm-password"
            className="h2 w5 bn login-details"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn bg-purple w5 h2 white mt3">
          Sign Up
        </button>
      </form>
      <p className="red">{errMessage}</p>
      <button
        className="btn bg-white purple w5 h2 bn b shadow-4 pa1 mt4"
        onClick={() => changeForm("login")}
      >
        Existing User?Log In
      </button>
    </div>
  );
}

export default SignUpForm;
