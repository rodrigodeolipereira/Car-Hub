public with sharing class CarController {

    //wrapper class
    public class Filters {
        @AuraEnabled
        public string searchKey {get;set;}
        @AuraEnabled
        public Decimal maxPrice {get;set;}
        @AuraEnabled
        public string[] categories  {get;set;}
        @AuraEnabled
        public string[] makeType {get;set;}
    }

    @AuraEnabled (Cacheable=true)
    public static List<Car__c> getCars(Filters filters) {
        String key, whereClause = '';
        Decimal maxPrice = -1;
        String[] categories, makeType, criteria = new List<String>{};

        if (filters != null) {
            maxPrice = filters.maxPrice;
            makeType = filters.makeType;
            categories = filters.categories;
            
            if (!string.isEmpty(filters.searchKey)) {
                key = '%' + filters.searchKey + '%';
                criteria.add('Name LIKE :key');
            }
            
            if (maxPrice >= 0) {
                criteria.add('MSRP__c <= :maxPrice');
            }
            
            if (filters.categories != null) {
                criteria.add('Category__c IN :categories');
            }

            if (filters.makeType != null) {
                criteria.add('Make__c IN :makeType');
            }

            if (criteria.size() > 0) {
                whereClause = ' WHERE ' + string.join(criteria, ' And ');
            }
        }
        
        string query = 'SELECT Id, Name, MSRP__c, Description__c, Category__c, Picture_URL__c FROM Car__c ';
        query += whereClause;
        query += ' Order By Name';

        return Database.query(query);
    }
}
