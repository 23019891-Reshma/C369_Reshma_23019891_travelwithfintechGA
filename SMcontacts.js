let contacts = [
    { name: 'ML', phone: '+65 98346712' },
    { name: 'R', phone: '+65 20917385' },
    { name: 'YL', phone: '+65 84761058' }
];

document.getElementById('addContactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const contactName = document.getElementById('contactName').value;
    const contactPhone = document.getElementById('contactPhone').value;
    contacts.push({ name: contactName, phone: contactPhone });
    updateContactList();
    document.getElementById('addContactForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addContactModal'));
    modal.hide();
});

function updateContactList() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${contact.name} ${contact.phone}`;
        li.onclick = () => selectContact(contact.phone, contact.name);
        contactList.appendChild(li);
    });
}

function searchContacts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchInput) || contact.phone.includes(searchInput)
    );
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    filteredContacts.forEach(contact => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${contact.name} ${contact.phone}`;
        li.onclick = () => selectContact(contact.phone, contact.name);
        contactList.appendChild(li);
    });
}

function selectContact(phone, name) {
    localStorage.setItem('selectedContact', JSON.stringify({ phone, name }));
    window.location.href = 'sendmoney.html';
}

function showRecent() {
    // Add logic for showing recent contacts if applicable
    updateContactList();
}

// Initial contact list display
updateContactList();



