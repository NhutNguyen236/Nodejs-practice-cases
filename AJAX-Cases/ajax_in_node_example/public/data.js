$(document).ready(function(){
    alert('application started');

    // First the author call out the GET method to get all data from DB 
    getdata();

    $('.addbtn').click(function(){
         var task = $("#task").val();
       $.ajax({
           url:'/task/addtask',
           method:'post',
           dataType:'json',
           data:{'task':task},
           success:function(response){
               if(response.msg=='success'){
            //    $("#task").remove();
               alert('task added successfully');
               getdata();
               $('#task').val('')
               }else{
                   alert('some error occurred try again');
               }
           },
           error:function(response){
               alert('server error occured')
           }
       });
    });
    // For delete function
    $(document).on('click','#del',function(){
        console.log($(this))
        var id = $(this).parent().find('#del').attr("value");
        // alert('delte',id)
        $.ajax({
            url:'/task/removetask',
            method:'delete',
            dataType:'json',
            data:{'id':id},
            success:function(response){
                if(response.msg=='success'){
                    alert('data deleted');
                    getdata();
                }else{
                    alert('data not get deleted');
                }
            },
            error:function(response){
                     alert('server error')   
            }
        });
    });
    // For edit function
    $(document).on('click','button.edit',function(){
        var id = $(this).parent().find('button.edit').val();
        // alert('delte',id)
        $.ajax({
            url:'/task/editTask',
            method:'post',
            dataType:'json',
            data:{'id':id},
            success:function(response){
                if(response.msg=='success'){
                    alert('data edited');
                    getdata();
                }else{
                    alert('cannot edit now');
                }
            },
            error:function(response){
                     alert('server error')   
            }
        });
    });
    function getdata(){
        $.ajax({
            url:'/task/gettask',
            method:'get',
            dataType:'json',
            success:function(response){
                 if(response.msg=='success'){
                     $('tr.taskrow').remove()
                     if(response.data==undefined || response.data==null || response.data==''){
                         $('.tblData').hide();
                     }else{
                        $('.tblData').show();
                     $.each(response.data,function(index,data){
                         var url = url+data._id;
                         index+=1;
                         $('tbody').append("<tr class='taskrow'><td>"+ index +"</td><td>"+data.task+"</td><td>"+"<button id='del' value='"+data._id+"'>delete</button>"+"</td><td>"+"<button class='edit' value='"+data._id+"'>edit</button>"+"</td></tr>");   
                     });
                 }
               }
            },
            error:function(response){
                alert('server error');
            }
        });
    }
});