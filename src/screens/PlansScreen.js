import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./PlansScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
function PlansScreen() {
  // to use products now we will pull the products from the database
  const [products, setProducts] = useState([]); // we are making it an empty array by default
  // as we know that extension push the products of stripe in our database so we need to use that feature now

  const user = useSelector(selectUser); // this will help in checkout function making

  const [subscription, setSubscription] = useState(null);

  // now we will make useeffect for the subscription

  useEffect(() => {
    // go inside the customer collection and then usinfg the user uid
    // then go inside the subscription
    // and get is the info we need and we can use that inside the then part

    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          // it means for every subscription inside there
          // we can use console.log(subscription)  to help us in debugging and destructuring
          setSubscription({
            role: subscription.data().role,
            // we are setting the the role as the role from the subscription data

            // now we want to know when the current period starts or ends
            // this will help us in getting the renewal date
            current_period_end: subscription.data().current_period_end.seconds,
            // this will give us a time stamp
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  // using name of our products collection that we have made inside our database already
  // and taking products only in which active is true
  // we are not using snapshot that is for realtime database changes as for now our plans are not changing thats why
  // so use get and it will give us in then the query taht we done earlier insie the when
  //querysnapshot return a bunch of docs as it is in array form so we are usinf foreach

  // this useeffect is for products
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          // so go inside this products object and go inside the  doc.id and set it to productDoc.data now
          // remember that each product inside the products collection have its own vartiables and prices collection
          const priceSnap = await productDoc.ref.collection("prices").get();
          // in this we are saying with this reference go inside the price collection odf the products and get us the price
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(), // this will again go inside the price doc and get the information inside the prices
            };
          });
          // as their can be more than one prices so use the above line with for each so for every single doc or doc name prices here so  go inside the procuct with doc id
          // and set the prices as our own object
        });
        setProducts(products); // so we are setting our products to the above products object we have created
      });
  }, []);
  console.log(products); // to check if its rendering or not and check it on the profile screen
  console.log(subscription); // to check if its rendering or not and check it on the profile screen

  //this is for prices and stripe
  const loadCheckout = async (priceId) => {
    // it will redirect as when use the subscribe button
    // when user checkout or add something in the basket we need to start the stripe checkout session
    // it is a doc refereal
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,

        success_url: window.location.origin,
        cancel_url: window.location.origin,
        // by this we come to basic screen after any url we are on
      });
    // after doc we are targeting the customer uid and we can easily pull it from our redux
    // as we are goin inside the customers collection and this id is the user logged in
    // the collection after doc is the new collection we want to make and name as per our choice so we neamed it checkout_session
    // and in this collection we want to add
    // AND WE WILL ALSO PASS THE SUCESSS URL AND THE CANCEL URL
    // AS WHEN REDIRECTED IF THE USER WANT TO CANCEL AT ANY TIME SO THE CANCEL URL WILL WORK OTHER WISE SUCCESSURL WILL WORK
    //WHETHER ITS SUCCESS OR FAIL WE WANT TO USE THIS CURRENT SCRREN SO USING WINDOWS.ORIGIN

    // to redirect the user and through to checkout page
    docRef.onSnapshot(async (snap) => {
      // using destructuring
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error ocurred ${error.message}`);
      }
      if (sessionId) {
        // we have a seesion so redirect to checkout
        // init stripe
        const stripe = await loadStripe(
          "pk_test_51LDPQjSDObcqEOkmvXbZDSlYgOLOy056CM6AD4Dol5X92Glcb7Yc8HvNE0PNjKTpF2RXNEQdbDub0NbrzLp4OKth00duD7GGEM"
        );
        // load stripe needs a key and in this pass the stripe publishable key
        // if we use live so use live secret key here and if test so use the test key if used earlier test key in starting so if live in starting so use here live key
        stripe.redirectToCheckout({ sessionId });
      }
    });
    // now stripe and payments started working fine
    // to check USE TEST CARD THATS 4242424242
    // IN STRIPE WE CAN PASS DIFFERENT CARD NUMBERS TO MIMIC DIFFERENT CARDS
    // extension will automatically update the firestore about this subscription
    // and it redirected us to the app
    // to check it we can go in stripe and check about this payments
    // and we can also see the payment subscription updation
    // and firestore is also updated
  };

  return (
    <div className="plansScreen">
      <br />
      {/* to map an object its not simple as array */}
      {/* so this will give us an array back with key and value pairs and provide the object name inside the entries */}
      {/* in map we are doing destructuring of array that is coming back as its in our console its also showing in this form first key and then id*/}
      {/*  */}
      {subscription && (
        <p>
          Renewal date :{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {/* mutilplying time stamp by thousands as its in seconds  */}
      {/* if subscription then render out the renewal date  */}
      {Object.entries(products).map(([productId, productData]) => {
        // this code will check that if the user subscription is active or not
        // this will help us by subscription part using the iscurren package variable

        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        // return (so we are checking if the meta data actuallt matches the product present on the plan secreen
        // so first converted our products to lowercase and then we checked the matching of it with the role of subscription

        return (
          // key is productid as its need to be unique
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen_plan--disabled"
            } plansScreen_plan`}
          >
            {/* so if there is current package so we are adding a disabled class name*/}
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
            {/* if its your current package than show its yoour current package otherwise show subscribe*/}
            {/* and only trigger the loadcheckout if its not the current package */}
            {/* we have to make it in such a way that it go inside the customer and then the customer id and create a collection subscription */}
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
