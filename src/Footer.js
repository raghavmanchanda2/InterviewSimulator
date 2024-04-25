import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/help");
  };
  return (
    <div style={{ width: "100%" }}>
      <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#fff" }}
      >
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: "#685aed" }}
        >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="#" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">IntuitiHire</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  Revolutionizing virtual job interviews with cutting-edge AI
                  for fairer, more insightful hiring decisions
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Social Media</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a
                    href="https://www.linkedin.com/company/IntuitiHire/"
                    className="text-dark"
                  >
                    LinkedIn
                  </a>
                </p>
                <p>
                  <a
                    href="https://twitter.com/i/flow/login?redirect_after_login=%2FIntuitiHire"
                    className="text-dark"
                  >
                    Twitter
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.instagram.com/IntuitiHire/"
                    className="text-dark"
                  >
                    Instagram
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.facebook.com/IntuitiHire"
                    className="text-dark"
                  >
                    Facebook
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="#!" className="text-dark">
                    Terms and Conditions
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-dark">
                    Privacy Policy
                  </a>
                </p>
                {/* <p>
                  <a href="#!" className="text-dark">
                    Shipping Rates
                  </a>
                </p> */}
                <p>
                  <a href="" className="text-dark" onClick={handleClick}>
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i> Canada, CA H3H2P1
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  contact@intuitihire.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 438 725 1807
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 514 557 1810
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Intutihire.All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
