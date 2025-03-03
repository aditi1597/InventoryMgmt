function deleteProduct(id)
{
   const result = confirm("Are you sure you want to delete this product?")

    if(result){
        fetch("/delete-product/" + id, {
            method: "POST"
        }).then(res =>{
            if(res.ok){
                console.log(location);
                window.location.href="/";
                // location.reload();
            }
        });
    }
}