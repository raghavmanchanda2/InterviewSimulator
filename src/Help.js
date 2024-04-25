import React from "react";

const Help = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Welcome to IntuitiHire</h1>
      <p>
        An innovative online mock interview simulator designed to bridge the gap
        between candidates and interviewers.
      </p>

      <h2>Getting Started</h2>
      <h3>For Candidates:</h3>
      <ol>
        <li>
          Accessing IntuitiHire: Visit the IntuitiHire website and click on the
          ‘Login/Signup’ button on the top right corner of the homepage.
        </li>
        <li>
          Account Creation: Select ‘Sign Up’ on the login page. Fill in your
          details, choose 'Candidate' as the user type, and click ‘Sign Up’ to
          create your account.
        </li>
      </ol>

      <h3>For Interviewers:</h3>
      <ol>
        <li>
          Accessing IntuitiHire: Navigate to the IntuitiHire website and click
          ‘Login/Signup’.
        </li>
        <li>
          Account Creation: On the login page, click ‘Sign Up’, enter your
          details, select 'Interviewer' as the user type, and then ‘Sign Up’ to
          register.
        </li>
      </ol>

      <h2>Navigating the Application</h2>
      <h3>For Candidates:</h3>
      <ul>
        <li>
          <strong>Dashboard:</strong> Upon logging in, you’ll find ‘Pending
          Interviews’ and options for ‘Mock Interview’ and ‘Mock Analysis’.
        </li>
        <li>
          <strong>Mock Interviews:</strong> These are practice sessions you can
          start anytime.
        </li>
        <li>
          <strong>Mock Analysis:</strong> Here, you can review your performance
          in previous interviews.
        </li>
      </ul>

      <h3>For Interviewers:</h3>
      <ul>
        <li>
          <strong>Dashboard:</strong> View ‘Created Interviews’ and ‘Completed
          Interviews’ along with options to ‘View Details’, ‘Assign’, and ‘View
          Report’.
        </li>
        <li>
          <strong>Creating Interviews:</strong> Click ‘Create Interview’ to
          design new interview sets for candidates.
        </li>
        <li>
          <strong>View Report:</strong> Analyze candidate responses and offer
          feedback.
        </li>
      </ul>

      {/* Other sections like "Using the application", "Reviewing Feedback", "Troubleshooting", "FAQs", and "Additional Support" can be added similarly */}

      <h2>Additional Support</h2>
      <p>
        If you encounter an issue not listed here, please contact our support
        team at{" "}
        <a href="mailto:support@intuitihire.com">support@intuitihire.com</a>.
      </p>

      <p>
        Remember, practice is key to confidence. IntuitiHire is here to help you
        prepare for success. Happy interviewing!
      </p>
    </div>
  );
};

export default Help;
