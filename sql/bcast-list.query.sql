CREATE OR REPLACE FUNCTION bcast_list (
        p_user_id UUID,
        p_lng FLOAT,
        p_lat FLOAT,
        p_max_dist_meters INT,
        p_tag TEXT [],
        p_availability TEXT,
        p_author TEXT,
        p_partecipation TEXT
    ) RETURNS SETOF RECORD LANGUAGE SQL AS $$
SELECT b.id,
    b.user_id,
    b.expires_at,
    b.title,
    b.max_users,
    b.tag, 
    b.location,
    round(st_distance(b.location, st_point(p_lng, p_lat)::geography)) AS dist_meters,
    count(bu.bcast_id) AS joined_users,
    CASE
        WHEN p_user_id = ANY(array_agg(bu.user_id)) THEN true
        ELSE false
    END AS joined
FROM public.bcast b
    LEFT JOIN bcast_user bu ON b.id = bu.bcast_id
WHERE 
    -- distance filter
    (
        p_max_dist_meters IS NULL
        OR st_distance(b.location, st_point(p_lng, p_lat)::geography) < p_max_dist_meters
    )
    -- tag filter
    AND (
        p_tag IS NULL
        OR b.tag && p_tag
    )
    -- author filter
    AND (
        p_author IS NULL
        OR (
            p_author = 'me'
            AND b.user_id = p_user_id
        )
        OR (
            p_author = 'others'
            AND b.user_id <> p_user_id
        )
    )
    -- partecipation filter
    AND (
        p_partecipation IS NULL
        OR (
            p_partecipation = 'partecipating'
            AND bu.joined = true
            AND bu.user_id = p_user_id
        )
        OR (
            p_partecipation = 'notPartecipating'
            AND (
                b.id NOT IN (
                    SELECT bcast_id FROM bcast_user
                        WHERE user_id = p_user_id
                        AND joined = true
                )
            )
        )
    )
GROUP BY b.id
HAVING 
    -- availability filter
    (
        p_availability IS NULL
        OR (
            p_availability = 'vacant'
            AND (
                b.max_users IS NULL
                OR count(bu.bcast_id) < b.max_users
            )
        )
        OR (
            p_availability = 'soldOut'
            AND count(bu.bcast_id) = b.max_users
        )
    )
ORDER BY location <-> st_point(p_lng, p_lat)::geography;
$$;
