(function() {
    var phonetab = document.getElementById("btnTabphone");
    phonetab.click();

})();

function openTab(evt, convName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(convName).style.display = "block";
    evt.currentTarget.className += " active";
}

var conversationPromise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json');
    xhr.send();
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var responseText = xhr.responseText;
            if (responseText) {
                resolve(JSON.parse(responseText));
            }
        }
    };
});

conversationPromise.then(function(conversationData) {
    console.log(conversationData);
    setConversationHTML("phone", conversationData, "tblPhoneNumber");
    setConversationHTML("messaging", conversationData, "tblTextMessaging");

});

function setConversationHTML(conversationType, conversationData, elementId) {
    var convData = conversationData.filter(function(value) {
        return value.conversationType === conversationType
    });
    var phoneNumberDiv = document.getElementById(elementId);
    var tableHTML = generateTableHTML(conversationType, convData);
    phoneNumberDiv.innerHTML = tableHTML;
}

function generateTableHTML(conversationType, convData) {

    var tableDataHtml = '';
    tableDataHtml += `<tr><th>APP</th><th>NAME</th><th>FROM</th><th>TO</th><th>CONVERSATION</th>`
    tableDataHtml += `<th>TYPE</th><th>INSERTION</th><th>DELETION</th><th>REMOVE</th></tr>`
    var convIcon = conversationType == "phone" ? `<i class="fa fa-phone">` : `<i class="fa fa-envelope">`;
    for (var i = 0; i < convData.length; i++) {
        tableDataHtml += `<tr><td>${convIcon}</td><td>${convData[i].name}</td><td>${convData[i].from}</td>`
        tableDataHtml += `<td>${convData[i].to}</td><td>${convData[i].conversation}</td>`
        tableDataHtml += `<td>${convData[i].type}</td><td>${convData[i].insertion}</td>`
        tableDataHtml += `<td>${convData[i].deletion}</td><td><i class="fa fa-trash deleteIcon"></td></tr>`
    }
    return tableDataHtml;
}

function search(searchElement, tableId) {
    var input = document.getElementById(searchElement.id);
    var filter = input.value.toUpperCase();
    var table = document.getElementById(tableId);
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        for (var j = 0; j < tr[i].cells.length; j++) {
            var td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}