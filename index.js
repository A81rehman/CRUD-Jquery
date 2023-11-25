$(function(){
    loadproducts();
    $("#Products").on("click",".btn-danger",deleteproduct);
    $("#Products").on("click",".btn-warning",update);
    $("#addbtn").click(addproduct);
    $("#closerecord").click(function(){
        $("#updatemodal").modal("hide"); 
    })
})
function loadproducts(){
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products",
        method: "GET",
        error: function(){
            var products =  $("#Products");
            products.append("An Error has Occured");
        },
        success: function(res){
            console.log(res);
        var products =  $("#Products");
        products.empty();
        for(var i = 0; i < res.length ; i++){
            var product = res[i];
        products.append(`<div class="product" dataid="${product._id}"><h3><b>${product.name}</b>
        <button  id="removebtn" class="btn btn-danger">Remove Product</button>
        <button  id="editbtn" class="btn btn-warning">Edit Product</button></h3>
        <p><b>Price:</b> ${product.price}</p><p><b>Color:</b> ${product.color}</p>
        <p><b>Department:</b> ${product.department}</p><p><b>Description:</b> ${product.description}</p></div`);
        }
        } 
    })
}

function deleteproduct(){
    var btn = $(this); 
    var parent = btn.closest(".product");
    let id = parent.attr("dataid");
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products/" + id,
        method: "DELETE",
    success:function(){
        loadproducts();
    }
    })
}

function addproduct(){
    var name = $("#Producttitle").val();
    var price = $("#Productprice").val();
    var color = $("#Productcolor").val();
    var department = $("#Productdepartment").val();
    var description = $("#ProductDescription").val();
    if(name === "" || price === "" || color === "" || department === "" || description === ""){
        window.alert("Input is required");
        return;
    }
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products",
        method: "POST",
        data:{name,price,color,department,description},
        success: function(res){
            console.log(res);
            loadproducts();
        }
    })
    $("#Producttitle").val(null);
    $("#Productprice").val(null);
    $("#Productcolor").val(null);
    $("#Productdepartment").val(null);
    $("#ProductDescription").val(null);
}

function update(){
    var btn = $(this); 
    var parent = btn.closest(".product");
    let id = parent.attr("dataid");
    $.get("https://usman-fake-api.herokuapp.com/api/products/" + id, 
    function(res){
    $("#updateid").val(id);
    $("#updateTitle").val(res.name);
    $("#updatePrice").val(res.price);
    $("#updateColor").val(res.color);
    $("#updateDepartment").val(res.department);
    $("#updateDescription").val(res.description); 
    $("#updatemodal").modal("show"); 
    });
    $("#updaterecord").click(function(){
    var id =  $("#updateid").val();
    var name = $("#updateTitle").val();
    var price = $("#updatePrice").val();
    var color = $("#updateColor").val();
    var department = $("#updateDepartment").val();
    var description =  $("#updateDescription").val(); 
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/products/" + id,
        data:{name,price,color,department,description},
        method: "PUT",
        success: function(res){
        loadproducts();
        $("#updatemodal").modal("hide"); 
        }
        })
    })
}