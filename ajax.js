/****

ajax封装的方法，外部可以直接引用该方法；
ajax函数参数解释：
第一个为提交的链接地址；
第二个为请求成功后返回的结果；
第三个为请求失败后返回的状态码；

****/


function ajax(url, fnSucc, fnFaild){
	//1.创建Ajax对象
	var oAjax=null;
	
	if(window.XMLHttpRequest){  //此处加了window为了解决ie6的兼容性
		oAjax=new XMLHttpRequest();
	}else{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP"); //实例化微软ie6的XMLHTTP插件
	}
	
	//2.连接服务器  用open方法
	//open参数解释：第一个为提交方式 GET/POST；第二个为提交地址；第三个为异步(true)或同步(false);
	oAjax.open('GET', url, true);
	
	//3.发送请求  用send()发送请求
	oAjax.send();
	
	//4.接收服务器的返回结果
	oAjax.onreadystatechange=function(){
		//请求状态：0 未初始化，还未调用open() 
		// 1 载入，已调用send()方法，正在发送请求 
		// 2 载入完成即send()方法完成，已接收全部响应内容 
		// 3 正在解析响应内容
		// 4 代表响应内容解析完成，可以在客户端调用了
		if(oAjax.readyState==4){
			//status 状态码  200代表所有请求及数据解析全部成功
			if(oAjax.status==200){//成功
				fnSucc(oAjax.responseText); //调用传入的成功的函数，并传入响应的内容
			}else{ //失败
				if(fnFaild){
					fnFaild(oAjax.status); //调用传入的失败的函数，并传入请的状态码
				}
			}
		}
	};
}