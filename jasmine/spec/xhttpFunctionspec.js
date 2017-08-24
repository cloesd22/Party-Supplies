describe("serverGET testing", function(){
	
	it("tests whether testelephant output is Test Success",function(){
		
		expect(serverGET('http://127.0.0.1:5000/req',function(){
		})=="Test Success").toBe(true);
	})


});