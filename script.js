var createButton = document.getElementById('createPost');
var modal = document.getElementById('modal');
var closeButton = document.getElementById('closeButton');
var cancelButton = document.getElementById('cancelButton');
var saveBtn = document.getElementById('save-btn');
var headingBlog = document.getElementById('headingBlog');
var blogContent = document.getElementById('blogContent');
var hiddenBlog = document.getElementById('hiddenBlog');

let blogPosts = [];

//this is used to clear Form
function clearForm() {
  headingBlog.value = '';
  blogContent.value = '';
}
//this will cancel/cut the page
cancelButton.addEventListener('click', closeModal);

//create the modal or open the hidden modal
createButton.addEventListener('click', openModal);
function openModal() {
  modal.style.display = 'block';
}

//close the current page
closeButton.addEventListener('click', closeModal);
function closeModal() {
  modal.style.display = 'none';
}

//save the blogPost
saveBtn.addEventListener('click', savePost);
function savePost(event) {
  event.preventDefault();
  var title = headingBlog.value;
  var description = blogContent.value;
  if (title.trim() === '' || description.trim() === '') {
    alert('Please fill in all fields');
    return;
  }
  var dateTime = new Date();
  var blogPost = { title, description, dateTime };
  blogPosts.push(blogPost);
  blogDisplay();
  closeModal();
  clearForm();
}

//edit the blogPost which is saved
hiddenBlog.addEventListener('click', editBlogPost);
function editBlogPost(event) {
  if (event.target.tagName.toLowerCase() === 'button' && event.target.textContent === 'Edit') {
    var index = event.target.dataset.index;
    var blogPost = blogPosts[index];
    headingBlog.value = blogPost.title;
    blogContent.value = blogPost.description;
    blogPosts.splice(index, 1);
    blogDisplay();
    openModal();
  }
}

//delete the saved blogPost
hiddenBlog.addEventListener('click', deleteBlogPost);
function deleteBlogPost(event) {
  if (event.target.tagName.toLowerCase() === 'button' && event.target.textContent === 'Delete') {
    var index = event.target.dataset.index;
    blogPosts.splice(index, 1);
    blogDisplay();
  }
}

//display the blogPost 
function blogDisplay() {
  hiddenBlog.innerHTML = '';
  blogPosts.forEach((blogPost, index) => {
    var modalElement = document.createElement('div');
    modalElement.classList.add('blogMain');
    var titlecontent = document.createElement('h2');
    titlecontent.textContent = blogPost.title;
    var descElement = document.createElement('p');
    descElement.textContent = blogPost.description;
    var dateElement = document.createElement('p');
    var dateTimeString = blogPost.dateTime.toLocaleString();
    dateElement.textContent = `Posted on ${dateTimeString}`;
    dateElement.classList.add('dateTime');
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.index = index;
    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.dataset.index = index;
    modalElement.appendChild(titlecontent);
    modalElement.appendChild(descElement);
    modalElement.appendChild(editBtn);
    modalElement.appendChild(deleteBtn);
    modalElement.appendChild(dateElement);
    hiddenBlog.appendChild(modalElement);
  });
}



