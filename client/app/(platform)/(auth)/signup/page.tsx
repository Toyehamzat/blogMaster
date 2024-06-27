import React from "react";

function page() {
  return (
    <div>
      <section className="flex flex-col max-w-xl p-8 mx-auto mt-8">
        <form className="space-y-8 mt-8">
          <div className="form-item">
            <label className="form-label">Username</label>
            <input
              className="form-control input"
              type="text"
              required
              disabled={false}
            />
            <div className="form-message"></div>
          </div>
          <div className="form-item">
            <label className="form-label">Password</label>
            <input
              className="form-control input"
              type="password"
              required
              disabled={false}
            />
            <div className="form-message"></div>
          </div>
          <div className="form-item">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-control input"
              type="password"
              required
              disabled={false}
            />
            <div className="form-message"></div>
          </div>
          <button className="button" type="submit" disabled={false}>
            Sign up
          </button>
        </form>
      </section>
    </div>
  );
}

export default page;
