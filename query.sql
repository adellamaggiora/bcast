
select 
    b.id, 
    b.user_id, 
    b.expires_at, 
    b.title,
    b.max_users, 
    b.tag, 
    -- st_astext(b.location) as location, 
    b.location,
    round(st_distance(b.location, st_point(p_lng, p_lat)::geography)) as dist_meters,
    count(bu.bcast_id) as joined_users,
    case when p_user_id = any(array_agg(bu.user_id))
         then true
         else false
    end as joined
from public.bcast b 
left join bcast_user bu on b.id = bu.bcast_id
where (p_max_dist_meters is null or st_distance(b.location, st_point(p_lng, p_lat)::geography) < p_max_dist_meters)
group by b.id
order by location <-> st_point(p_lng, p_lat)::geography;
