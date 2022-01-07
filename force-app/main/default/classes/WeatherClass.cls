public class WeatherClass {
    static string idCidade = '450002';
    
    @AuraEnabled(cacheable=true)
    public static string weather() {
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.hgbrasil.com/weather?woeid=' + idCidade);
        request.setMethod('GET');
        
		Http http = new Http();
		HttpResponse response = http.send(request);
		
        Object weathers;
		String returnValue;

		// If the request is successful, parse the JSON response
		if (response.getStatusCode() == 200) {
    		// Deserialize the JSON string into collections of primitive data types.
    		return response.getBody();
        }
        return 'Failed getting a request token. HTTP Code = '+response.getStatusCode()+
                            '. Message: '+response.getStatus()+'. Response Body: '+response.getBody();
    }
}