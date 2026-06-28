// Generic resource manager for planets, stars, and galaxies
class ResourceManager {
  constructor(resourceType) {
    this.resourceType = resourceType;
    this.form = document.querySelector(`#${resourceType}Form`);
    this.nameInput = document.querySelector('#name');
    this.imageInput = document.querySelector('#image');
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleCreate(e));
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleDelete(btn));
    });
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleEdit(btn));
    });
  }

  async handleCreate(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', this.nameInput.value);
    if (this.imageInput.files[0]) {
      formData.append('image', this.imageInput.files[0]);
    }

    const response = await fetch(`/${this.resourceType}`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      location.reload();
    } else {
      alert(`Error creating ${this.resourceType.slice(0, -1)}`);
    }
  }

  async handleDelete(btn) {
    if (confirm('Are you sure?')) {
      const response = await fetch(`/${this.resourceType}/${btn.dataset.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        location.reload();
      }
    }
  }

  async handleEdit(btn) {
    const newName = prompt(`Enter new ${this.resourceType.slice(0, -1)} name:`);
    if (newName) {
      const response = await fetch(`/${this.resourceType}/${btn.dataset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: newName })
      });
      if (response.ok) {
        location.reload();
      }
    }
  }
}

// Determine resource type from form ID and initialize
const form = document.querySelector('form[id$="Form"]');
if (form) {
  const resourceType = form.id.replace('Form', '');
  new ResourceManager(resourceType);
}
