/* 
This code is used to configure the companies that we want to scrape.
Each company has a unique baseUrl, fetchMethod, fetchBody, and isWorkday.
The baseUrl is the url that we will fetch from.
The fetchMethod is the method that we will use to fetch from the baseUrl.
The fetchBody is the body that we will use to fetch from the baseUrl.
The isWorkday is a boolean that tells us if the company uses Workday or not.
If the company uses Workday, we will use a different fetch method to get the data.
If the company does not use Workday, we will use the default fetch method to get the data. 
*/

export default {
    ibm: {
      baseUrl: 'https://jobsapi-internal.m-cloud.io/api/stjobbulk?organization=2242&limitkey=4A8B5EF8-AA98-4A8B-907D-C21723FE4C6B&facet=publish_to_cws:true&fields=id,ref,url,brand,title,level,open_date,department,sub_category,primary_city,primary_country,primary_category,addtnl_locations,language',
    },
    amzn: {
      baseUrl: 'https://amazon.jobs/en/search.json?normalized_country_code[]=USA&radius=24km&facets[]=normalized_country_code&facets[]=normalized_state_name&facets[]=normalized_city_name&facets[]=location&facets[]=business_category&facets[]=category&facets[]=schedule_type_id&facets[]=employee_class&facets[]=normalized_location&facets[]=job_function_id&facets[]=is_manager&facets[]=is_intern&offset=0&result_limit=10&sort=relevant&latitude=&longitude=&loc_group_id=&loc_query=&base_query=&city=&country=&region=&county=&query_options=&business_category[]=student-programs&',
    },
    salesforce: {
      baseUrl: 'https://salesforce.wd1.myworkdayjobs.com/wday/cxs/salesforce/Futureforce_NewGradRoles/jobs',
      fetchMethod: 'POST',
      fetchBody: JSON.stringify({
        appliedFacets: {},
        limit: 20,
        offset: 0,
        searchText: '',
      }),
      isWorkday: true,
    },
    fidelity: {
      baseUrl: 'https://wd1.myworkdaysite.com/wday/cxs/fmr/FidelityCareers/jobs',
      fetchMethod: 'POST',
      fetchBody: JSON.stringify({
        "appliedFacets": {
          "locationCountry": [
            "bc33aa3152ec42d4995f4791a106ed09"
          ],
          "jobFamilyGroup": [
            "e39fd413f80c0104eb5775256a997b12"
          ]
        },
        "limit": 20,
        "offset": 0,
        "searchText": ""
      }),
      isWorkday: true,
    },
  };
  