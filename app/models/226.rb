a=%w(
211
276
288
291
316
340
350
91
119
198
227
238
230
239
240
245
246
247
248
253
254
255
256
277
278
279
296
306
307
308
309
319
329
330
331
332
333
334
335
344
345
348
349
361
362
363
364
365
366
367
380
381
382
383
384
385
386
387
389
390
396
418
419
420
421
423
433
434
435
436
445
452
453
454
455
456
461
462
463
464
498
500
501
502
516
517
518
519
532
533
534
535
543
544
545
546
547
552
553
554
555
560
561
562
563
575
576
577
578
588
593
594
595
596
599
600
601
610
611
612
613
618
619
620
621
626
627
628
629
630
631
632
633
634
635
636
639
640
641
642
643
644
645
658
659
660
661
666
667
668
669
682
683
684
685
695
696
697
698
704
705
706
707
708
709
710
711
720
721
722
723
728
729
730
731
736
737
738
739
749
750
751
752
78
79
80
81
86
87
88
89
90
96
97
98
99
120
121
122
127
128
129
130
147
152
153
154
155
160
161
162
163
176
177
178
179
188
195
196
197
207
219
220
228
229
74
75
76
77
82
83
84
85
93
94
95
100
101
102
103
104
105
106
123
124
125
126
143
144
145
146
148
149
150
151
156
157
158
159
172
173
174
175
191
192
193
194
208
209
210
231
232
233
234
235
236
237
241
242
243
244
249
250
251
252
265
273
274
275
280
281
282
283
289
290
292
293
294
295
301
302
303
304
305
314
315
317
318
325
326
327
328
336
338
339
341
342
351
352
354
355
356
357
358
359
360
388
391
392
393
394
164
165
166
167
180
181
199
200
201
202
257
258
259
260
284
285
286
287
320
372
373
375
398
403
404
405
111
112
113
118
135
136
137
138
168
169
170
171
182
183
184
189
190
203
204
205
206
216
217
92
131
132
133
134
406
409
437
438
439
440
446
465
466
467
468
473
485
486
488
492
503
504
505
506
579
580
581
582
654
655
656
657
699
741
742
743
744
757
758
759
760
107
107
108
109
110
139
140
141
142
212
213
214
215
297
298
299
300
407
520
521
522
523
524
525
526
527
678
679
680
681
716
717
718
719
765
766
767
353
395
399
400
401
402
408
414
415
416
416
417
424
429
430
431
432
448
449
450
451
457
458
459
460
475
476
477
489
490
491
493
528
529
530
531
540
541
542
548
549
550
551
556
557
558
559
568
569
570
571
572
573
574
587
589
590
591
592
597
598
606
607
608
609
614
615
616
617
622
623
624
625
637
638
646
647
648
649
650
651
652
653
662
663
664
665
670
671
672
673
674
675
676
677
690
700
701
702
703
712
713
714
715
724
725
726
727
732
733
734
735
753
754
755
756
261
262
263
264
310
311
312
313
337
343
368
369
370
371
376
377
378
379
397
441
442
443
444
447
469
470
471
472
474
478
479
480
481
482
483
484
507
508
509
511
512
513
514
515
564
565
566
566
567
583
584
584
585
586
686
687
688
689
691
692
693
694
745
746
747
748
761
762
763
764

)


# p a.count('3500')

a.each do |e|
  # puts e
  puts "found: #{e}" if a.count(e) > 1
end

# p a.group_by {|e| e}.count
