export const elastic = ["search_by_keywords", "search_by_keywords_in_news", "search_by_keywords_in_historic", "search_by_keywords_combined"]

export const urls = {
    "find_avg_events_by_country": "http://localhost:5000/api/avg_casualties_country/",
    "find_avg_events_by_country_top5": "http://localhost:5000/api/avg_casualties_country/",
    "find_events_by_country_and_year": "http://localhost:5000/api/avg_casualties_country/year/",
    "find_events_by_activty_group_and_country": "http://localhost:5000/api/group_casualties/activity_group/",
    "find_events_by_activty_group_and_spesific_country": "http://localhost:5000/api/group_casualties/activity_group/",
    "find_group_with_same_targets": "http://localhost:5000/api/group_target/group_with_same_targets/",
    "find_countries_with_same_kind": "http://localhost:5000/api/group_target/countries_with_same_kind/",
    "find_region_with_high_activity_group": "http://localhost:5000/api/group_target/region_with_high_activity_group/",
    "find_events_by_attack_type": "http://localhost:5000/api/event_attack_type/",
    "search_by_keywords": "http://localhost:5000/api/search/keywords/",
    "search_by_keywords_in_news": "http://localhost:5000/api/search/news/",
    "search_by_keywords_in_historic": "http://localhost:5000/api/search/historic/",
    "search_by_keywords_combined": "http://localhost:5000/api/search/combined/"
};

export const descriptionSearch = "search any words that one of them will be in the article like this new york,bomb,.."
export const descriptionCountry = "search event of any country you want"

export const top5Condition = ["find_avg_events_by_country", "find_events_by_country_and_year"]
export const countryCondition = ["find_events_by_activty_group_and_spesific_country"]
export const regionOrCountryCondition = ["find_region_with_high_activity_group", "find_countries_with_same_kind", "find_group_with_same_targets"]
