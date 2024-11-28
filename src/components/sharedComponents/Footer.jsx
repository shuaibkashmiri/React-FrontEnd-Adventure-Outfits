import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./footer.scss";
const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container py-4">
        <div className="row">
          {/* Social Media Section */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-3">Follow us on Social Media</h5>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-light"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-light"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-light"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0">
              © 2024 <strong>Shoaib Mushtaq Bhat</strong>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
