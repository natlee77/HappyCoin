const Contact = () => {
    return <>
   <div className="contact container">
   <article>
        <section id="contact-form">
          <h1>Contact Oss</h1>
          <p>Fill in form  to contact oss</p>
          <form>
            <div className="form-control">
              <label htmlFor="firstName">FirstName</label>
              <input
                type="text"
                name="firstName"
                id="firstName" />
            </div>
            <div className="form-control">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName" />
            </div>
            <div className="form-control">
              <label htmlFor="email">E-Post</label>
              <input
                type="email"
                name="email"
                id="email" />
            </div>
            <div className="form-control">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"></textarea>
            </div>
            <button
              className="btn"
              type="submit">
              Send
            </button>
          </form>
        </section>

      </article>

   </div>
    </>
}

export default Contact;
