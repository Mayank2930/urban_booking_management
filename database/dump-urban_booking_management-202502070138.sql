--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-07 01:38:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16977)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "slotId" integer NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16976)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 224
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 221 (class 1259 OID 16961)
-- Name: carpenters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carpenters (
    id integer NOT NULL,
    name text NOT NULL,
    experience integer DEFAULT 0 NOT NULL,
    rating double precision DEFAULT 0.0 NOT NULL
);


ALTER TABLE public.carpenters OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16960)
-- Name: carpenters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carpenters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carpenters_id_seq OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 220
-- Name: carpenters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carpenters_id_seq OWNED BY public.carpenters.id;


--
-- TOC entry 223 (class 1259 OID 16970)
-- Name: slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slots (
    id integer NOT NULL,
    "carpenterId" integer NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.slots OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16969)
-- Name: slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.slots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.slots_id_seq OWNER TO postgres;

--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 222
-- Name: slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.slots_id_seq OWNED BY public.slots.id;


--
-- TOC entry 219 (class 1259 OID 16670)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text DEFAULT 'temporary_password'::text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16669)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4722 (class 2604 OID 16980)
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 16964)
-- Name: carpenters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carpenters ALTER COLUMN id SET DEFAULT nextval('public.carpenters_id_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 16973)
-- Name: slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots ALTER COLUMN id SET DEFAULT nextval('public.slots_id_seq'::regclass);


--
-- TOC entry 4716 (class 2604 OID 16673)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4886 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
231dd40e-de8f-49f1-a3ec-617a9ef2b9aa	d4b3e0133852b82b9ef11bd812aba4e3d60df64282af30d3a2ae948b02b57e9c	2025-02-05 15:33:09.8838+05:30	20250205100309_init	\N	\N	2025-02-05 15:33:09.841456+05:30	1
34e51eb3-a296-4efe-bff2-f2774f484b9b	8fe9fc581eb92f168baeed82b7783f8876aea20a8c2ec4ce50a36909df9e7d85	2025-02-05 16:14:53.22358+05:30	20250205104453_rename_user_table	\N	\N	2025-02-05 16:14:53.181478+05:30	1
95408f40-7323-469c-b9dc-a4fb0ed58d5c	f66037fb4309b91a37bc8ee80e004282342c1f6d25954cfa5d97a37ca6e18adb	2025-02-05 16:16:43.462609+05:30	20250205104643_rename_user_table	\N	\N	2025-02-05 16:16:43.417727+05:30	1
bbc617dc-40c6-4cdf-b57c-f4dfeefd09be	597b8b95cfa069234b53fd4c67b98159fb521620af4bdb1655798d1a0e312be7	2025-02-05 16:22:08.655793+05:30	20250205105208_rename_user_table	\N	\N	2025-02-05 16:22:08.646128+05:30	1
41289f09-84cf-48ee-b66f-ae91a4ee7730	af4e4543cae38cbc2ac654213919281adf20c7b90d71e866df651871c2d1b318	2025-02-06 15:47:29.313686+05:30	20250206101729_add_unique_constraint_to_slots	\N	\N	2025-02-06 15:47:29.292684+05:30	1
749fe786-d6b0-4d8a-8f6b-957ff45be8a9	c032d666293b92e71c2454e57faf7c7ee865b0c498fce86b612196293c982e5f	2025-02-06 20:51:17.617539+05:30	20250206152117_praying_for_db	\N	\N	2025-02-06 20:51:17.604282+05:30	1
\.


--
-- TOC entry 4894 (class 0 OID 16977)
-- Dependencies: 225
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, "userId", "slotId", status, "createdAt") FROM stdin;
1	1	1	pending	2025-02-06 12:50:42.413
2	6	6	cancelled	2025-02-06 18:07:24.11
3	6	6	confirmed	2025-02-06 18:40:22.652
4	6	18	pending	2025-02-06 18:44:36.708
5	6	54	pending	2025-02-06 18:58:53.259
\.


--
-- TOC entry 4890 (class 0 OID 16961)
-- Dependencies: 221
-- Data for Name: carpenters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carpenters (id, name, experience, rating) FROM stdin;
1	John Carpenter	5	4.5
2	John Doe	5	4.5
3	Vansh	4	3
4	James	5	4.7
5	Ashok Dhaniya	8	4.9
6	Kashvi Kapoor	3	4.5
7	Jazzy Singh	6	4.8
\.


--
-- TOC entry 4892 (class 0 OID 16970)
-- Dependencies: 223
-- Data for Name: slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slots (id, "carpenterId", "startTime", "endTime") FROM stdin;
1	1	2025-02-06 10:00:00	2025-02-06 11:00:00
6	2	2025-02-07 08:00:00	2025-02-07 09:00:00
9	1	2025-02-10 09:00:00	2025-02-10 10:00:00
10	1	2025-02-10 10:00:00	2025-02-10 11:00:00
11	1	2025-02-10 11:00:00	2025-02-10 12:00:00
12	1	2025-02-10 12:00:00	2025-02-10 13:00:00
13	1	2025-02-10 13:00:00	2025-02-10 14:00:00
14	1	2025-02-10 14:00:00	2025-02-10 15:00:00
15	1	2025-02-10 15:00:00	2025-02-10 16:00:00
16	1	2025-02-10 16:00:00	2025-02-10 17:00:00
17	1	2025-02-10 17:00:00	2025-02-10 18:00:00
18	2	2025-02-10 09:00:00	2025-02-10 10:00:00
19	2	2025-02-10 10:00:00	2025-02-10 11:00:00
20	2	2025-02-10 11:00:00	2025-02-10 12:00:00
21	2	2025-02-10 12:00:00	2025-02-10 13:00:00
22	2	2025-02-10 13:00:00	2025-02-10 14:00:00
23	2	2025-02-10 14:00:00	2025-02-10 15:00:00
24	2	2025-02-10 15:00:00	2025-02-10 16:00:00
25	2	2025-02-10 16:00:00	2025-02-10 17:00:00
26	2	2025-02-10 17:00:00	2025-02-10 18:00:00
27	3	2025-02-10 09:00:00	2025-02-10 10:00:00
28	3	2025-02-10 10:00:00	2025-02-10 11:00:00
29	3	2025-02-10 11:00:00	2025-02-10 12:00:00
30	3	2025-02-10 12:00:00	2025-02-10 13:00:00
31	3	2025-02-10 13:00:00	2025-02-10 14:00:00
32	3	2025-02-10 14:00:00	2025-02-10 15:00:00
33	3	2025-02-10 15:00:00	2025-02-10 16:00:00
34	3	2025-02-10 16:00:00	2025-02-10 17:00:00
35	3	2025-02-10 17:00:00	2025-02-10 18:00:00
36	4	2025-02-10 09:00:00	2025-02-10 10:00:00
37	4	2025-02-10 10:00:00	2025-02-10 11:00:00
38	4	2025-02-10 11:00:00	2025-02-10 12:00:00
39	4	2025-02-10 12:00:00	2025-02-10 13:00:00
40	4	2025-02-10 13:00:00	2025-02-10 14:00:00
41	4	2025-02-10 14:00:00	2025-02-10 15:00:00
42	4	2025-02-10 15:00:00	2025-02-10 16:00:00
43	4	2025-02-10 16:00:00	2025-02-10 17:00:00
44	4	2025-02-10 17:00:00	2025-02-10 18:00:00
45	5	2025-02-10 09:00:00	2025-02-10 10:00:00
46	5	2025-02-10 10:00:00	2025-02-10 11:00:00
47	5	2025-02-10 11:00:00	2025-02-10 12:00:00
48	5	2025-02-10 12:00:00	2025-02-10 13:00:00
49	5	2025-02-10 13:00:00	2025-02-10 14:00:00
50	5	2025-02-10 14:00:00	2025-02-10 15:00:00
51	5	2025-02-10 15:00:00	2025-02-10 16:00:00
52	5	2025-02-10 16:00:00	2025-02-10 17:00:00
53	5	2025-02-10 17:00:00	2025-02-10 18:00:00
54	6	2025-02-10 09:00:00	2025-02-10 10:00:00
55	6	2025-02-10 10:00:00	2025-02-10 11:00:00
56	6	2025-02-10 11:00:00	2025-02-10 12:00:00
57	6	2025-02-10 12:00:00	2025-02-10 13:00:00
58	6	2025-02-10 13:00:00	2025-02-10 14:00:00
59	6	2025-02-10 14:00:00	2025-02-10 15:00:00
60	6	2025-02-10 15:00:00	2025-02-10 16:00:00
61	6	2025-02-10 16:00:00	2025-02-10 17:00:00
62	6	2025-02-10 17:00:00	2025-02-10 18:00:00
63	7	2025-02-10 09:00:00	2025-02-10 10:00:00
64	7	2025-02-10 10:00:00	2025-02-10 11:00:00
65	7	2025-02-10 11:00:00	2025-02-10 12:00:00
66	7	2025-02-10 12:00:00	2025-02-10 13:00:00
67	7	2025-02-10 13:00:00	2025-02-10 14:00:00
68	7	2025-02-10 14:00:00	2025-02-10 15:00:00
69	7	2025-02-10 15:00:00	2025-02-10 16:00:00
70	7	2025-02-10 16:00:00	2025-02-10 17:00:00
71	7	2025-02-10 17:00:00	2025-02-10 18:00:00
\.


--
-- TOC entry 4888 (class 0 OID 16670)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	Mayank	bmayank029@gmail.com	temporary_password
2	Vansh Sethi	vsethi@gmail.com	temporary_password
3	Cherish Sofat	scherish29@gmail.com	temporary_password
4	Aashim Bansal	abansal@gmail.com	12345
5	Saksham Sikri	ssikri1@gmail.com	12345
6	Bhavya	bbhavya@gmail.com	$2a$10$nT7qutyXijChyd1c8Ub9XeaFhzewqKxba3j9.4mmXjMMrvjoJ5RK2
\.


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 224
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 5, true);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 220
-- Name: carpenters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carpenters_id_seq', 7, true);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 222
-- Name: slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slots_id_seq', 71, true);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 4726 (class 2606 OID 16397)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4736 (class 2606 OID 16986)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 16968)
-- Name: carpenters carpenters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carpenters
    ADD CONSTRAINT carpenters_pkey PRIMARY KEY (id);


--
-- TOC entry 4734 (class 2606 OID 16975)
-- Name: slots slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT slots_pkey PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 16677)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4737 (class 1259 OID 16987)
-- Name: bookings_slotId_status_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "bookings_slotId_status_key" ON public.bookings USING btree ("slotId", status);


--
-- TOC entry 4732 (class 1259 OID 17910)
-- Name: slots_carpenterId_startTime_endTime_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "slots_carpenterId_startTime_endTime_key" ON public.slots USING btree ("carpenterId", "startTime", "endTime");


--
-- TOC entry 4727 (class 1259 OID 16678)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 4739 (class 2606 OID 16998)
-- Name: bookings bookings_slotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES public.slots(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4740 (class 2606 OID 16993)
-- Name: bookings bookings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4738 (class 2606 OID 16988)
-- Name: slots slots_carpenterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slots
    ADD CONSTRAINT "slots_carpenterId_fkey" FOREIGN KEY ("carpenterId") REFERENCES public.carpenters(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2025-02-07 01:38:09

--
-- PostgreSQL database dump complete
--

