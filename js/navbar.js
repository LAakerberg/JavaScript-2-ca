const navbarMenu = document.querySelector("#navbar");

navbarMenu.innerHTML += `

<nav
        class="navbar navbar-expand-lg navbar-dark bg-darkpurple"
        aria-label="Eighth navbar example"
      >
        <div class="container">
          <a class="navbar-brand" href="index.html">SoMe One</a>
          <button
            class="navbar-toggler bg-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample07"
            aria-controls="navbarsExample07"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample07">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="login.html">Login</a>
              </li>
            </ul>
            <form role="search">
              <input
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <div class="ps-2 pt-2 pb-2"><button class="btn btn-dark border-darkgrey pt-2" ><span class="material-symbols-outlined">
              search
              </span></button></div>
          </div>
        </div>
      </nav>

`;
