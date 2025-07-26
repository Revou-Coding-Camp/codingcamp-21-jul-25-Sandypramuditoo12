const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const list = document.getElementById("contact-list");

const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editName = document.getElementById("edit-name");
const editPhone = document.getElementById("edit-phone");
const cancelEdit = document.getElementById("cancel-edit");

const successMessage = document.getElementById("success-message");
const contactCount = document.getElementById("contact-count");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editingIndex = null;

function renderContacts() {
  list.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.className = "bg-gray-100 p-4 flex justify-between items-center rounded";
    li.innerHTML = `
      <div>
        <p class="font-semibold">${contact.name}</p>
        <p class="text-sm text-gray-600">${contact.phone}</p>
      </div>
      <div class="space-x-2">
        <button data-index="${index}" class="edit-btn bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
        <button data-index="${index}" class="delete-btn bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
      </div>
    `;
    list.appendChild(li);
  });

  // Update jumlah kontak
  contactCount.textContent = `Total ${contacts.length} kontak tersimpan`;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert("Nama dan nomor tidak boleh kosong!");
    return;
  }

  contacts.push({ name, phone });
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
  form.reset();

  // Tampilkan pesan sukses
  successMessage.classList.remove("hidden");
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 2000);
});

list.addEventListener("click", function (e) {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Yakin ingin menghapus kontak ini?")) {
      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      renderContacts();
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    editingIndex = index;
    editName.value = contacts[editingIndex].name;
    editPhone.value = contacts[editingIndex].phone;
    editModal.classList.remove("hidden");
  }
});

editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  contacts[editingIndex].name = editName.value.trim();
  contacts[editingIndex].phone = editPhone.value.trim();
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
  editModal.classList.add("hidden");
});

cancelEdit.addEventListener("click", function () {
  editModal.classList.add("hidden");
});

renderContacts();
