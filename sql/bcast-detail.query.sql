create or replace function bcast_detail (p_user_id uuid, p_bcast_id uuid, p_lng float, p_lat float) 
returns setof record 
language sql as $$
select 
    b.*,
    round(st_distance(b.location, st_point(p_lng, p_lat)::geography)) as dist_meters,
    count(bu.bcast_id) as joined_users,
    case when p_user_id = any(array_agg(bu.user_id))
         then true
         else false
    end as joined
from public.bcast b 
inner join bcast_user bu on b.id = bu.bcast_id
where b.id = p_bcast_id
group by b.id
$$;
