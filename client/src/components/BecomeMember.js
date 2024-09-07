    // src/components/BecomeMember.js
    import React from 'react';
    import { FaStar, FaTicketAlt, FaGift, FaRupeeSign } from 'react-icons/fa'; // Import necessary icons
    import './stylee.css';

    const BecomeMember = () => {
    return (
        <div className="plans-container">
            <h3 className="plans-main"><strong>OHOBO</strong></h3>
            <h1 className="plans-title">Available Plans</h1>
            <div className="plans-cards">
                <div className="plan-card blue">
                    <div className="plan-header">
                        <FaStar className="plan-icon" />
                        <h2>BLUE</h2>
                    </div>
                    <ul>
                        <li><FaTicketAlt /> Reward night after 7 room nights</li>
                        <li><FaStar /> 10% discount on base hotels</li>
                        <li><FaStar /> 5% discount on Wizard hotels</li>
                        <li><FaGift /> Partner coupons worth Rs.3500</li>
                        <li><FaRupeeSign /> Free Membership Renewal</li>
                        <li><FaStar /> Validity: 6 months</li>
                    </ul>
                    <button className="blue-plan-button">Get Blue for ₹99</button>
                </div>
                <div className="plan-card silver">
                    <div className="plan-header">
                        <FaStar className="plan-icon" />
                        <h2>SILVER</h2>
                    </div>
                    <ul>
                        <li><FaTicketAlt /> Reward night after 6 room nights</li>
                        <li><FaStar /> 10% discount on base hotels</li>
                        <li><FaStar /> 5% discount on Wizard hotels</li>
                        <li><FaGift /> Exclusive Benefits</li>
                        <li><FaRupeeSign /> Partner coupons worth Rs.5500</li>
                        <li><FaTicketAlt /> Super Discount Coupon(s)</li>
                        <li><FaRupeeSign /> Free Membership Renewal</li>
                        <button className="silver-plan-button">Get silver for ₹199</button>    
                    </ul>
                </div>
                <div className="plan-card gold">
                    <div className="plan-header">
                        <FaStar className="plan-icon" />
                        <h2>GOLD</h2>
                    </div>
                    <ul>
                        <li><FaTicketAlt /> Reward night after 5 room nights</li>
                        <li><FaStar /> 10% discount on base hotels</li>
                        <li><FaStar /> 5% discount on Wizard hotels</li>
                        <li><FaGift /> Exclusive Benefits</li>
                        <li><FaRupeeSign /> Partner coupons worth Rs.5500</li>
                        <li><FaTicketAlt /> Super Discount Coupon(s)</li>
                        <li><FaRupeeSign /> Free Membership Renewal</li>
                    </ul>
                    <button className="gold-plan-button">Get gold for ₹199</button> 

                </div>
            </div>
            <div className="terms-conditions">
                <h2>Terms and Conditions</h2>
                <ul>
        <li>OHOBO reserves the right to change the fees, program structure, terms, and conditions, or the benefits associated with the Wizard membership at any point in time.</li>
        <li>The Wizard membership discount is applicable only for the booking created within the validity period of one's membership.</li>
        <li>Free stay is limited to one night.</li>
        <li>Free Stay can be availed only once a year on selected Wizard Hotels while the membership is active, in case of membership expiry the member has to renew the membership to avail the free stay. To clarify, there cannot be more than 1 free stay per year per member.</li>
        <li>For Blue and Silver, the bookings will not be counted, and the counter will be reset if the membership is not renewed within 365 days from the date of expiry of the membership.</li>
        <li>For Blue and Silver, the Free Stay will be valid only for 365 days from the date of unlocking the Free Stay.</li>
        <li>For Blue and Silver, the Free Stay would require a payment of a service charge, which will be communicated by OYO while the Member books a Free Stay room.</li>
        <li>Free stay cannot be clubbed with other bookings.</li>
        <li>Pay at Hotel exclusive benefit is available only to Gold Wizard members on select Wizard Hotels.</li>
        <li>Wizard Members have the option to select 2 Base Hotels.</li>
        <li>Users will be able to choose any Wizard property as their Base hotel.</li>
        <li>The membership is non-transferable and non-refundable once purchased.</li>
        <li>Membership cannot be downgraded during the validity period once purchased.</li>
        <li>There is no option to change the Wizard Base Hotel(s) till the selected Base hotels are a part of the Wizard Member Hotel Network. If any Member hotel leaves the Wizard membership status, the customer will be intimated and will be able to set a new hotel as his Base Hotel while creating the next booking. This condition can change in the future subject to program structure revision policy rights.</li>
        <li>Free membership extension is valid only once per user, and that too only if the benefits availed are less than the membership price in his/her first membership plan.</li>
        <li>Wizard Member hotels can change from time to time, and members shall verify from time to time based on the Wizard tag to the respective property. Hence, OYO doesn't guarantee a Wizard discount at any hotel for perpetuity.</li>
        <li>Invoice will be sent to the registered OYO Wizard member after their sign up to their registered email id. If the email id is not registered, kindly call the customer support center and get it registered separately.</li>
        <li>There is a maximum discount cap per booking for availing the OYO Wizard membership discount.</li>
        <li>Any kind of customer fraud being done related to OYO Wizard Membership can result in strict legal or policy action against the customer’s id and phone number.</li>
        <li>Wizard alliance benefits are also subject to change and OYO has the right to offer these benefits to selected or all customers from time to time.</li>
        <li>Discount will be applicable only when the booking is made through the OYO app, website, call center, or by walking into a Wizard Member Hotel. Also, the booking needs to be made with the registered mobile number only for discount eligibility.</li>
        <li>40% off coupon(s) awarded is valid for one booking of a maximum of 10 room nights only. Silver Members will be able to avail 40% off on one booking using the single coupon code. Gold Members will be able to avail 40% off on two bookings using the two single coupon codes.</li>
    </ul>
</div>
        </div>
    );
    };

    export default BecomeMember;
