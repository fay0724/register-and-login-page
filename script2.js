// Mneampilkan animasi Spin
const loader = document.querySelector(".loader-quart");
loader.style.display = "none";
const btnText = document.getElementById("btnText");
function showLoading() {
  btnText.style.display = "none";
  loader.style.display = "block";
}
// Sembunyikan Spin
function hideLoading() {
  btnText.style.display = "block";
  loader.style.display = "none";
}
// Menampilkan Popup
function showPopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  popup.classList.add("open-slide");
  overlay.style.display = "block";
}
// Menutup Popup
function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("open-slide");
}
// Menampilkan Animasi kemudian Popup
function showPopupAfterAnimation() {
  showLoading();

  setTimeout(function () {
    hideLoading();

    showPopup();
  }, 1500);
}

// Memeriksa validasi semua input sebelum submit
function validation() {
  let username = document.Formfill.Username.value;
  let email = document.Formfill.Email.value;
  let password = document.Formfill.Password.value;
  let cpassword = document.Formfill.Cpassword.value;
  // Menghapus pesan error sebelumnya
  clearError("resultUsername");
  clearError("resultEmail");
  clearError("resultPassword");
  clearError("resultCpass");
  // Memeriksa apakah ada setidaknya satu input yang kosong
  if (username === "" || email === "" || password === "" || cpassword === "") {
    // Tampilkan animasi loading selama 0.5 detik
    showLoading();
    setTimeout(function () {
      // Sembunyikan animasi loading setelah 0.5 detik
      hideLoading();

      // Munculkan pesan error di setiap inputan yang kosong
      if (username === "") {
        setError("resultUsername", "Create your Username");
      }
      if (email === "") {
        setError("resultEmail", "Enter your Email");
      }
      if (password === "") {
        setError("resultPassword", "Enter your password");
      }
      if (cpassword === "") {
        setError("resultCpass", "Confirm your Password");
      }
    }, 500);
    return false;
  }

  // Membuat variabel untuk memeriksa apakah ada error
  let hasError = false;

  // Memeriksa apakah setidaknya ada satu input yang kosong
  if (username === "") {
    setError("resultUsername", "Create your Username");
    hasError = true;
  }

  if (email === "") {
    setError("resultEmail", "Enter your Email");
    hasError = true;
  } else {
    // Validasi panjang email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("resultEmail", "Enter your Email correctly");
      hasError = true;
    }
  }

  if (password === "") {
    setError("resultPassword", "Enter your password");
    hasError = true;
  } else {
    // Validasi panjang password minimal 6 karakter
    if (password.length < 6) {
      setError("resultPassword", "Pass must be at least 6 characters");
      hasError = true;
    } else {
      // Validasi apakah password mengandung minimal 1 huruf besar dan 1 huruf kecil
      let hasUpperCase = /[A-Z]/.test(password);
      let hasLowerCase = /[a-z]/.test(password);
      if (!hasUpperCase || !hasLowerCase) {
        setError(
          "resultPassword",
          "Pass must have at least 1 uppercase letter and 1 lowercase letter"
        );
        hasError = true;
      } else {
        // Validasi apakah password mengandung minimal 1 karakter khusus
        let hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
          password
        );
        if (!hasSpecialCharacter) {
          setError("resultPassword", "Passmust contain 1 special character");
          hasError = true;
        }
      }
    }
  }

  if (cpassword === "") {
    setError("resultCpass", "Confirm your Password");
    hasError = true;
  } else {
    // Memeriksa apakah cpassword sama dengan password
    if (cpassword !== password) {
      setError("resultCpass", "Password doesn't match");
      hasError = true;
    }
  }

  // Mengembalikan nilai false jika ada error, sehingga submit tidak diizinkan
  if (hasError) {
    return false;
  } else {
    showPopupAfterAnimation();
    return false;
  }
}

// Fungsi untuk memeriksa validitas domain email menggunakan API Email Verifier
async function checkEmailDomain(email) {
  const apiKey = "2efa65dc53376beea98a91c088a39e99cc5e09cc";
  const apiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data.webmail || data.data.disposable || data.data.accept_all;
  } catch (error) {
    return false;
  }
}

// Mengganti tampilan password (text atau password) dan icon mata
function togglePasswordVisibility(inputName, iconElement) {
  let passwordInput = document.getElementsByName(inputName)[0];
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    iconElement.setAttribute("name", "eye-outline");
  } else {
    passwordInput.type = "password";
    iconElement.setAttribute("name", "eye-off-outline");
  }
}

// Memeriksa panjang username saat berpindah dari inputnya
function checkUsernameLength() {
  let username = document.Formfill.Username.value;
  if (username.length < 6) {
    setError("resultUsername", "Username must be 6-8 characters");
  } else {
    clearError("resultUsername");
  }
}

// Menampilkan pesan error pada suatu elemen
function setError(elementId, message) {
  document.getElementById(elementId).innerHTML = message;
}

// Menghapus pesan error pada suatu elemen
function clearError(elementId) {
  document.getElementById(elementId).innerHTML = "";
}

// Memeriksa email saat penginputan
document.Formfill.Email.addEventListener("input", async function () {
  let email = document.Formfill.Email.value;
  try {
    if (!(await checkEmailDomain(email))) {
      setError("resultEmail", "Invalid Email");
    } else {
      // Menghapus pesan error jika email sesuai dengan domain yang diharapkan
      clearError("resultEmail");
    }
  } catch (error) {
    // Penanganan error lain, misalnya menampilkan pesan kesalahan ke web
    clearError("resultEmail");
  }
});

// Memeriksa password saat penginputan
document.Formfill.Password.addEventListener("input", function () {
  let password = document.Formfill.Password.value;
  let hasErrorPassword = false;

  // Validasi panjang password minimal 6 karakter
  if (password.length < 6) {
    setError("resultPassword", "Pass must be at least 6 characters");
    hasErrorPassword = true;
  } else {
    clearError("resultPassword");

    // Validasi apakah password mengandung minimal 1 huruf besar dan 1 huruf kecil
    let hasUpperCase = /[A-Z]/.test(password);
    let hasLowerCase = /[a-z]/.test(password);
    if (!hasUpperCase || !hasLowerCase) {
      setError("resultPassword", "at least 1 uppercase and 1 lowercase");
      hasErrorPassword = true;
    } else {
      clearError("resultPassword");

      // Validasi apakah password mengandung minimal 1 karakter khusus
      let hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
        password
      );
      if (!hasSpecialCharacter) {
        setError("resultPassword", "Pass must contain 1 special character");
        hasErrorPassword = true;
      } else {
        clearError("resultPassword");
      }
    }
  }
});

// Memeriksa cpassword saat penginputan
document.Formfill.Cpassword.addEventListener("input", function () {
  let password = document.Formfill.Password.value;
  let cpassword = document.Formfill.Cpassword.value;

  // Memeriksa apakah cpassword sama dengan password
  if (cpassword !== password) {
    setError("resultCpass", "Password doesn't match");
  } else {
    clearError("resultCpass");
  }
});

// Menampilkan animasi loading dan popup saat tombol diklik
const btn = document.querySelector(".btn");
btn.addEventListener("click", function (event) {
  // event.preventDefault();

  // Memeriksa validasi form sebelum menampilkan animasi loading dan popup
  if (validation()) {
    showPopupAfterAnimation();
  }
});
