//---------validating emails--------------
let upload = document.getElementById('upload');
upload.addEventListener('change', () => {
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {

        let Arr = fr.result.split(/\r?\n|\n/).map(e => {
            return e.split(',');
        });
        Window.valNo = 0;
        let invalNo = 0;
        Window.valMail = [];
        Arr.forEach(e => {
            let em = String(e);
            let m = e.map(e => {
                return `<td>${e}</td>`; // td = table data
            })
            let creEle = document.createElement("tr"); //tr = table row
            creEle.innerHTML = m;
            if (em != "") { // so that blank row will not be printed as well as counted
                // if (em.indexOf('@') != 0) {
                //     document.querySelector("table#val").appendChild(creEle);
                //     return false;
                // }
                if (em.charAt(em.length - 4) == '.') {
                    document.querySelector("table#val").appendChild(creEle);
                    Window.valMail.push(em);
                    Window.valNo = Window.valNo + 1;
                    return false;
                }
                else if (em.charAt(em.length - 3) == '.') {
                    document.querySelector("table#val").appendChild(creEle);
                    Window.valMail.push(em);
                    Window.valNo = Window.valNo + 1;
                    return false;
                }
                else {
                    document.querySelector("table#inval").appendChild(creEle);
                    invalNo = invalNo + 1;
                    // console.log(creEle);
                    return false;
                }
            }
        });

        document.querySelector('#valCount').innerHTML = Window.valNo;
        document.querySelector('#invalCount').innnerHTML = invalNo;
    };
});
//-----------sending emails---------------

function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "write your own username", //change
        Password: "write password",  // app password //change
        To: "write email",
        From: " write Email",
        Subject: document.querySelector('#subject').value,
        Body: document.getElementById('msg').value
    }).then(
        message => alert(Window.valNo + " mails has been sent successfully, press " + message + " to continue.")
    );
    console.log(document.getElementById('msg').value);
    console.log(document.getElementById('msg').innerHTML);
    console.log(document.getElementById('msg').innerText);
}